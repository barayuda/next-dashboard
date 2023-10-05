import React from "react";
import Alerts from "../../components/Alerts/Alerts";
import Button from "../../components/Bottons/Button";
import ExampleDropdown from "../../components/Dropdowns/ExampleDropdown";
import Modal from "../../components/Modals/Modal";
import ModalTailwind from "../../components/Modals/ModalTailwind";
import TabsWithIcon from "../../components/Tabs/TabWithIcon";

// layout for page
import AdminLayout from "../../layouts/AdminLayout";
import { getServerSideProps } from "./index";

export { getServerSideProps };


export default function Components() {
  return (
    <AdminLayout>
      <Alerts />
      <Button />
      <ExampleDropdown />
      <Modal />
      <ModalTailwind />
      <TabsWithIcon />
    </AdminLayout>
  );
}
