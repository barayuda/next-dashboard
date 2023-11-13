/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  SortingState,
  Table,
} from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table';

import type { RankingInfo } from '@tanstack/match-sorter-utils';
import { compareItems, rankItem } from '@tanstack/match-sorter-utils';

import { Dialog, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaCircleNotch, FaEdit, FaSearch, FaTrash } from 'react-icons/fa';

import { zodResolver } from '@hookform/resolvers/zod';
import jwtDecode from 'jwt-decode';
import type { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import AdminLayout from '../../../layouts/AdminLayout';
import type { JWTPayloadTypes, UserTypes } from '../../../services/data-types';
import type { User } from '../../../services/user';
import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../../../services/user';

interface GetServerSideProps {
  req: {
    cookies: {  
      token: string;
    };
  };
}
interface CardTableProps {
  color: string;
}

export function getServerSideProps(context: GetServerSideProps) {
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const payload: JWTPayloadTypes = jwtDecode<JWTPayloadTypes>(token);
  // console.log(payload);
  const userFromPayload = payload;
  return {
    props: {
      user: userFromPayload,
    },
  };
}

// Tanstack React Table 8
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const roles = ['ADMIN','MEMBER','OWNER'] ;

export type Roles = (typeof roles)[number];

type RoleInfo = { value: Roles; label: string };

export const mapperRoles: { [key in Roles]: RoleInfo } = {
  ["ADMIN"]: { value: "ADMIN", label: "Admin" },
  ["MEMBER"]: { value: "MEMBER", label: "Member" },
  ["OWNER"]: { value: "OWNER", label: "Owner" },
};

export const rolesArray: RoleInfo[] = Object.values(mapperRoles);

export const maritalStatuses = ['single', 'married', 'divorced', 'widowed'];

export type MaritalStatus = (typeof maritalStatuses)[number];

export const mapperMaritalStatuses: { [key in MaritalStatus]: string } = {
  single: 'Single',
  married: 'Married',
  divorced: 'Divorced',
  widowed: 'Widowed',
};

const schema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, { message: 'A name is required!' }).max(100),
  email: z.string().email({ message: 'An email is required!' }),
  roles: z.string(),
  /* alias: z
    .string()
    .max(100)
    .transform((alias) => {
      if (alias === '') return null;
      return alias;
    }),
  dateOfBirth: z
    .string()
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'A valid date of birth is required.',
    })
    .transform((date) => new Date(date)),
  weigth: z
    .string()
    .refine((weight) => !isNaN(parseFloat(weight)), {
      message: 'A weight is required.',
    })
    .transform((weight) => Number(weight)), */
});

roles :["ADMIN"];
export default function User(props: CardTableProps) {
  const { color } = props;

  const { data: session } = useSession();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(Object);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  // PopUp
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Form');
  const [formData, setFormData] = useState<User>(Object);
  const [formAction, setFormAction] = useState('create');
  const [isMutating, setIsMutating] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleExportXLSX = (data: User[]) => {
    /* filter data */
    const filtered = data.filter((row: any) =>
      row.roles.some((role: string) => role === 'Employee')
    );
    
    

    /* flatten objects */
    let i = 1;
    const rows = filtered.map((row: any) => ({
      no: i++,
      name: row.name,
      email: row.email,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    /* fix headers */
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [['No', 'Name', 'Email', 'Created At', 'Updated At']],
      {
        origin: 'A1',
      }
    );
    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet['!cols'] = [{ wch: max_width }];
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, 'DataSheet.xlsx', { compression: true });
  };

  // Form validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<User>({
    // defaultValues: {
    //   name: '',
    //   email: '',
    //   // roles: [],
    //   active: true,
    // },
    resolver: zodResolver(schema),
  });
  // console.log(watch('name'));

  const onSubmit: SubmitHandler<User> = async (data) => {
    if (formAction === 'create') {
      console.log('saving', data);
      void handleAddData(data);
    } else {
      console.log('updating', data);
      void handleEditData(data);
    }
    const session = await getSession();
      console.log('session', session);
      if (session) {
        const accessToken = session.user?.token?.accessToken;
        console.log('typeof accessToken', typeof accessToken);
        console.log('accessToken', accessToken);
        if (typeof accessToken === 'string') {
          Cookies.set('token', accessToken, { secure: true });
          console.log('token', accessToken);
        }

        const refreshToken = session.user?.token?.refreshToken;
        console.log('typeof refreshToken', typeof refreshToken);
        if (typeof refreshToken === 'string') {
          Cookies.set('refreshToken', refreshToken, { secure: true });
          console.log('refreshToken', refreshToken);
        }

        // console.log('response', response);
        // console.log('response.data', response.data);
        // console.log('response.data.data', response.data.data);
        // console.log('token', token);
        // const tokenBase64 = btoa(token);

        // const tokenBase64 = Buffer.from(accessToken).toString('base64');
        // console.log('tokenBase64', tokenBase64);
        // Cookies.set('token', tokenBase64);
        // console.log('token', tokenBase64);

        // const jwtBase64 = Buffer.from(refreshToken).toString('base64');
        // Cookies.set('refreshToken', jwtBase64);
        // console.log('refreshToken', jwtBase64);
      }

  };

  const handleFormValue = () => {
    setValue('_id', formData._id);
    setValue('name', formData.name);
    setValue('email', formData.email);
    setValue('roles', formData.roles);
  };
  const showAddModal = () => {
    setFormAction('create');
    setModalTitle('Form Add User Data');
    setFormData({
      _id: '',
      name: '',
      email: '',
      roles: [''],
      active: false,
      dateOfBirth: '',
    });
    handleFormValue();
    setShowModal(true);
  };
  const handleAddData = async (props: User) => {
    await addUser(props).then((response) => {
      if (response.error) {
        console.log('Add data Failed: ' + JSON.stringify(response));
        toast.error('Add data Failed:' + response.message);
      } else {
        toast.success('Add data Success !!!');
        console.log('APA ISI NYA : ' + JSON.stringify(props));
        console.log('ikan bilis' + JSON.stringify(props.roles));
        setData({});
        void loadData();
      }
    });
    setShowModal(false);
  };
  const showEditModal = (props: User) => {
    reset();
    setFormAction('update');
    setModalTitle('Form Edit User Data');
    setFormData(props);
    handleFormValue();
    setShowModal(true);
  };
  const handleEditData = async (props: User) => {
    const response = await updateUser(props);
    if (response) {
      if (response.error) {
        console.log('Update data Failed: ' + JSON.stringify(response));
        toast.error('Update data Failed:' + response.message);
      } else {
        toast.success('Update data Success !!!');
        setData({});
        void loadData();
      }
    }
    setShowModal(false);
  };
  const showDeleteModal = (props: User) => {
    setFormAction('delete');
    setModalTitle('Delete User Data');
    setFormData(props);
    setShowModal(true);
  };
  const handleDeleteData = async (id: string) => {
    setIsMutating(true);
    await deleteUser(id).then((response) => {
      if (response.error) {
        console.log('Delete data Failed: ' + JSON.stringify(response));
        toast.error('Delete data Failed:' + response.message);
      } else {
        toast.success('Delete data Success !!!');
        setData({});
        void loadData();
      }
    });
    setShowModal(false);
    setIsMutating(false);
  };

  const rolesOptions = Object.entries(mapperRoles).map(([value, { label }]) => (
    <option value={value} key={value}>
      {label}
    </option>
  ));
  

  const maritalStatusOptions = Object.entries(mapperMaritalStatuses).map(
    ([value, label]) => (
      <option value={value} key={value}>
        {label}
      </option>
    )
  );

  const columns = useMemo<ColumnDef<User, unknown>[]>(
    () => [
      {
        id: 'id',
        header: 'Action',
        cell: (info) => (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('data row', info.row.original);
                showEditModal(info.row.original);
              }}
              className={`mr-1 mb-1 rounded bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600`}
            >
              <FaEdit />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('data row', info.row.original);
                showDeleteModal(info.row.original);
              }}
              className={`mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600`}
            >
              <FaTrash />
            </button>
          </>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => `${row.name}`,
        id: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        id: 'email',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'roles',
        header: 'Roles',
        id: 'roles',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'active',
        header: 'Active',
        id: 'active',
        cell: (info) => (
          <span>{`${info.getValue() === true ? 'ACTIVE' : 'INACTIVE'}`}</span>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'createdAt',
        id: 'createdAt',
        header: () => <span>Created At</span>,
        cell: (info) => new Date(info.getValue() as Date).toUTCString(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        id: 'updatedAt',
        cell: (info) => new Date(info.getValue() as Date).toUTCString(),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    // const onLogedOut = () => {
    //   Cookies.remove('token');
    //   Cookies.remove('refreshToken');
    //   void router.push('/auth/login');
    // };

    console.log('Data session: ' + JSON.stringify(session));
    await getUsers(session as Session).then((response) => {
      if (response.error) {
        console.log('Get data Failed: ' + JSON.stringify(response));
        toast.error('Get data Failed');
        // if (
        //   response.message === 'Unauthorized' ||
        //   response.message === 'Forbidden: jwt expired'
        // ) {
        // onLogedOut();
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        void router.push('/auth/login');
        // }
      } else {
        toast.success('Get data Success !!!');
        setData(response.data.details);
      }
      setIsLoading(false);
    });
  }, [router, session]);

  useEffect(() => {
    // toast.error('First call on mount..');
    void loadData();

    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, []);

  const [user, setUser] = useState<UserTypes>({
    id: '',
    name: '',
    email: '',
    avatar: '',
  });
  useEffect(() => {
    if (session) {
      console.log('session', session);
    }
    const token = Cookies.get('token');
    if (token) {
      // const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode<JWTPayloadTypes>(token);
      console.log('payload', payload);
      if (payload.user) {
        const userFromPayload: UserTypes = payload.user;
        setUser(userFromPayload);
      }
    }
  }, [session]);

  return (
    <AdminLayout>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          {showModal ? (
            <Transition.Root show={showModal} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setShowModal}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="xs:my-8 xs:w-full relative w-6/12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="">
                              <div className="xs:ml-4 mt-3 sm:mt-0 sm:text-left">
                                <Dialog.Title
                                  as="h3"
                                  className="text-blueGray-700 text-xl font-bold leading-6"
                                >
                                  {modalTitle}
                                  <hr className="border-b-1 border-blueGray-300 mt-6" />
                                </Dialog.Title>
                                {formAction === 'delete' && (
                                  <>
                                    <div className="bg-blueGray-100 mt-5 flex-auto rounded py-5 lg:px-5">
                                      <h6 className="text-blueGray-500 mt-3 mb-6 text-sm font-bold uppercase">
                                        Are you sure to delete this data?
                                      </h6>
                                    </div>
                                  </>
                                )}
                                {formAction !== 'delete' && (
                                  <>
                                    <input
                                      id="id"
                                      type="hidden"
                                      readOnly={true}
                                      defaultValue={formData._id}
                                      {...register('_id')}
                                    />
                                    <input
                                      id="password"
                                      type="hidden"
                                      readOnly={true}
                                      defaultValue={formData.password}
                                      {...register('password')}
                                    />
                                    <div className="bg-blueGray-100 mt-5 flex-auto rounded py-5 lg:px-5">
                                      <h6 className="text-blueGray-500 mt-3 mb-6 text-sm font-bold uppercase">
                                        User Information
                                      </h6>
                                      <div className="flex flex-wrap">
                                        <div className="w-full px-4 lg:w-6/12">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="name"
                                            >
                                              Name
                                            </label>
                                            <input
                                              id="name"
                                              type="text"
                                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                                              placeholder="Input a name"
                                              // defaultValue={getValues('name')}
                                              defaultValue={formData.name}
                                              {...register('name')}
                                              // onChange={(e) => {
                                              //   setValue('name', e.target.value, {
                                              //     shouldValidate: true,
                                              //   }); // thrid args trigger validation
                                              // }}
                                            />
                                            {errors.name?.message && (
                                              <span className="text-sm text-red-400">
                                                {errors.name.message}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="w-full px-4 lg:w-6/12">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="email"
                                            >
                                              Email address
                                            </label>
                                            <input
                                              id="email"
                                              type="email"
                                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                                              placeholder="Input an email"
                                              {...register('email')}
                                              defaultValue={formData.email}
                                            />
                                            {errors.email?.message && (
                                              <span className="text-sm text-red-400">
                                                {errors.email.message}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <hr className="border-b-1 border-blueGray-300 mt-6" />

                                      <h6 className="text-blueGray-500 mt-3 mb-6 text-sm font-bold uppercase">
                                        Contact Information
                                      </h6>
                                      <div className="flex flex-wrap">
                                        <div className="lg:w-12/12 w-full px-4">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="grid-password"
                                            >
                                              Address
                                            </label>
                                            <input
                                              type="text"
                                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full px-4 lg:w-4/12">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="grid-password"
                                            >
                                              City
                                            </label>
                                            <input
                                              type="text"
                                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                                              defaultValue="New York"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full px-4 lg:w-4/12">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="grid-password"
                                            >
                                              Country
                                            </label>
                                            <input
                                              type="text"
                                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                                              defaultValue="United States"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full px-4 lg:w-4/12">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="grid-password"
                                            >
                                              Postal Code
                                            </label>
                                            <input
                                              type="text"
                                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                                              defaultValue="Postal Code"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full px-4 lg:w-4/12">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="maritalStatus"
                                            >
                                              Marital Status
                                            </label>
                                            <select
                                              id="maritalStatus"
                                              disabled={isSubmitting}
                                              {...register('maritalStatus')}
                                            >
                                              {maritalStatusOptions}
                                            </select>
                                            {errors.maritalStatus?.message && (
                                              <div>
                                                {errors.maritalStatus.message}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="w-full px-4 lg:w-4/12">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="roles"
                                            >
                                              Roles
                                            </label>
                                            <select
                                              id="roles"
                                              disabled={isSubmitting}
                                              {...register('roles')}
                                            >
                                              {rolesOptions}
                                            </select>
                                            
                                          </div>
                                        </div>
                                      </div>

                                      <hr className="border-b-1 border-blueGray-300 mt-6" />

                                      <h6 className="text-blueGray-500 mt-3 mb-6 text-sm font-bold uppercase">
                                        About Me
                                      </h6>
                                      <div className="flex flex-wrap">
                                        <div className="lg:w-12/12 w-full px-4">
                                          <div className="relative mb-3 w-full">
                                            <label
                                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                              htmlFor="grid-password"
                                            >
                                              About me
                                            </label>
                                            <textarea
                                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                                              rows={4}
                                              defaultValue="A beautiful UI Kit and Admin for NextJS & Tailwind CSS. It is Free and Open Source."
                                            ></textarea>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {formAction !== 'delete' && (
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                                disabled={isSubmitting}
                              >
                                {!isSubmitting ? (
                                  <>
                                    {formAction === 'create'
                                      ? 'ADD NEW'
                                      : 'MODIFY'}
                                  </>
                                ) : (
                                  <>
                                    {formAction === 'create' ? (
                                      <>
                                        <FaCircleNotch className="mx-auto animate-spin text-xl text-white" />
                                        {' SAVING...'}
                                      </>
                                    ) : (
                                      <>
                                        <FaCircleNotch className="mx-auto animate-spin text-xl text-white" />
                                        {' MODIFYING...'}
                                      </>
                                    )}
                                  </>
                                )}
                              </button>
                            )}
                            {formAction === 'delete' && (
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                                disabled={isMutating}
                                onClick={(e) => {
                                  e.preventDefault();
                                  void handleDeleteData(formData._id);
                                }}
                              >
                                {!isMutating ? (
                                  'DELETE'
                                ) : (
                                  <>
                                    <FaCircleNotch className="mx-auto animate-spin text-xl text-white" />
                                    {' DELETING...'}
                                  </>
                                )}
                              </button>
                            )}
                            <button
                              type="button"
                              className="mr-3 inline-flex w-full justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                              onClick={() => setShowModal(false)}
                            >
                              CANCEL
                            </button>
                          </div>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          ) : null}
          <div className="sm:py-10 sm:px-10">

          <div>
              <h3
                    className={
                      'text-lg font-semibold ' +
                      (color === 'light' ? 'text-blueGray-700' : 'text-black')
                    }
                  >
                    Welcome {user.name}
                  </h3>
              </div>
            <div
              className={
                'relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg ' +
                (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
              }
            >
             
              <div className="mb-0 rounded-t border-0 px-4 py-3">
                <div className="mx-autp flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-4">
                  <h3
                    className={
                      'text-lg font-semibold ' +
                      (color === 'light' ? 'text-blueGray-700' : 'text-white')
                    }
                  >
                    List of Users
                  </h3>
                  <div className="mr-3 hidden flex-row flex-wrap items-center md:flex lg:ml-auto">
                    <div className="relative flex w-full flex-wrap items-stretch">
                      <button
                        className="mr-1 mb-1 rounded bg-green-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                        onClick={() => {
                          void handleExportXLSX(data);
                        }}
                      >
                        Export to XLSX
                      </button>
                      <button
                        className="mr-1 mb-1 rounded bg-yellow-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                        onClick={() => {
                          void showAddModal();
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="bg-lightBlue-400 mr-1 mb-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                        onClick={loadData}
                      >
                        Refresh
                      </button>
                      <div>
                        <span className="text-blueGray-300 absolute z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pl-3 text-center text-base font-normal leading-snug">
                          {/* <i className="fas fa-search"></i> */}
                          <FaSearch />
                        </span>
                        <DebouncedInput
                          value={globalFilter ?? ''}
                          onChange={(value) => setGlobalFilter(String(value))}
                          className="placeholder-blueGray-300 text-blueGray-600 relative w-full rounded border-0 bg-white px-3 py-3 pl-10 text-sm shadow outline-none focus:outline-none focus:ring"
                          placeholder="Search all columns..."
                        />
                        {/* <GlobalFilter
                          filter={globalFilter}
                          setFilter={setGlobalFilter}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                {isLoading && (
                  <div className="ml-auto mr-auto mt-3 mb-3 block w-full items-center px-6 text-center font-semibold">
                    Loading data....
                  </div>
                )}

                <table className="w-full border-collapse items-center bg-transparent">
                  <thead className="thead-light">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <th
                              key={header.id}
                              colSpan={header.colSpan}
                              className={
                                'whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase ' +
                                (color === 'light'
                                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                  : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                              }
                            >
                              {header.isPlaceholder ? null : (
                                <>
                                  <div
                                    {...{
                                      className: header.column.getCanSort()
                                        ? 'cursor-pointer select-none'
                                        : '',
                                      onClick:
                                        header.column.getToggleSortingHandler(),
                                    }}
                                  >
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                    {{
                                      asc: ' 🔼',
                                      desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ??
                                    header.column.getCanSort()
                                      ? '📶'
                                      : ''}
                                  </div>
                                  {header.column.getCanFilter() ? (
                                    <div>
                                      <Filter
                                        column={header.column}
                                        table={table}
                                      />
                                    </div>
                                  ) : null}
                                </>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <td
                                key={cell.id}
                                className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-1 px-6 align-middle"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mb-0 rounded-b border-0 bg-black px-4 py-3 text-black">
                <nav className="block" aria-label="...">
                  <ul className="flex list-none flex-wrap rounded pl-0">
                    <li className="mr-5 mt-1 text-white">
                      <span>
                        Page{' '}
                        <strong>
                          {table.getState().pagination.pageIndex + 1} of{' '}
                          {table.getPageCount()}
                        </strong>{' '}
                      </span>
                      <span>
                        | Go to page:{' '}
                        <input
                          type="number"
                          defaultValue={
                            table.getState().pagination.pageIndex + 1
                          }
                          onChange={(e) => {
                            const page = e.target.value
                              ? Number(e.target.value) - 1
                              : 0;
                            table.setPageIndex(page);
                          }}
                          style={{ width: '100px' }}
                          className="rounded text-black"
                        />
                      </span>{' '}
                      <select
                        className="rounded text-black"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                          table.setPageSize(Number(e.target.value));
                        }}
                      >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                          </option>
                        ))}
                      </select>
                    </li>
                    <li className="mr-1 mt-2">
                      <button
                        className="relative mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-pink-500 bg-white p-0 text-xs font-semibold leading-tight text-pink-500 first:ml-0"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                      >
                        {'<<'}
                      </button>{' '}
                    </li>
                    <li className="mr-1 mt-2">
                      <button
                        className="relative mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-pink-500 bg-white p-0 text-xs font-semibold leading-tight text-pink-500 first:ml-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        {'<'}
                      </button>{' '}
                    </li>

                    <li className="mr-1 mt-2">
                      <button
                        className="relative mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-pink-500 bg-white p-0 text-xs font-semibold leading-tight text-pink-500 first:ml-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        {'>'}
                      </button>{' '}
                    </li>
                    <li className="mr-1 mt-2">
                      <button
                        className="relative mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-pink-500 bg-white p-0 text-xs font-semibold leading-tight text-pink-500 first:ml-0"
                        onClick={() =>
                          table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                      >
                        {'>>'}
                      </button>{' '}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === 'number' ? (
    <div>
      <div className="h-1" />
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="placeholder-blueGray-300 text-blueGray-600 relative w-full rounded border-0 bg-white px-3 py-3 text-sm shadow outline-none focus:outline-none focus:ring"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="placeholder-blueGray-300 text-blueGray-600 relative w-full rounded border-0 bg-white px-3 py-3 text-sm shadow outline-none focus:outline-none focus:ring"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <div className="h-1" />
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="placeholder-blueGray-300 text-blueGray-600 relative w-full rounded border-0 bg-white px-3 py-3 text-sm shadow outline-none focus:outline-none focus:ring"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
