# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Next steps

```bash
cd t3-app-blog

npm install react-google-login --force
# or
npm install react-google-login --legacy-peer-deps

npx prisma db push
npm run dev
nvm list
nvm use 12.22.12
nvm use 16.16.0
/root/.nvm/versions/node/v16.16.0/bin/npm run dev
/root/.nvm/versions/node/v16.16.0/bin/npm run build


npx prisma format
npx prisma db push
npx prisma db seed

npm run dev

npm i supabase --save-dev
npx supabase init
npx supabase start
npx supabase status
npx supabase stop

Digest: sha256:31c3b2d87690c37142f2c345553332a8417a11a7784fd96b84911fae5dd7e909
Status: Downloaded newer image for public.ecr.aws/supabase/deno-relay:v1.5.0
Seeding data supabase\seed.sql...
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
D:\Applications\Data\ReactNextJS\ultimate-blog-app
```

## Using PM2

```sh
npm run build
pm2 --name NextJSPG-DASHBOARD start npm -- start --watch --version 1.0.0
pm2 logs NextJSPG-DASHBOARD --lines 100
pm2 stop NextJSPG-DASHBOARD --watch
pm2 delete NextJSPG-DASHBOARD --watch

npm run build
pm2 start extras/pm2-nextdashboard.config.js --env development
pm2 start extras/pm2-nextdashboard.config.js --env production

```

## Run as a service

```sh
https://computingforgeeks.com/how-to-run-java-jar-application-with-systemd-on-linux/

/lib/systemd/system/multi-user.target/
/usr/lib/systemd/system/

example:
/lib/systemd/system/multi-user.target/nodes.service
/usr/lib/systemd/system/nodes.service

/etc/systemd/system/multi-user.target.wants/nextjspg-dashboard.service

chmod +x /var/www/nextjspg-dashboard/extras/start-service.sh
chmod +x /var/www/nextjspg-dashboard/extras/stop-service.sh

sudo systemctl daemon-reload
systemctl start nextjspg-dashboard.service
systemctl status nextjspg-dashboard.service
systemctl stop nextjspg-dashboard.service
systemctl restart nextjspg-dashboard.service -l
systemctl enable nextjspg-dashboard.service
systemctl is-enabled nextjspg-dashboard.service
journalctl -u nextjspg-dashboard.service -n 100
sudo systemd-analyze verify nextjspg-dashboard.service
sudo systemd-analyze --user verify nextjspg-dashboard.service
```

## Reference

[Github Repos](https://github.com/sonipranjal/ultimate-blog-app)
[DB Diagrams](https://dbdiagram.io/d/63b5dd9e7d39e42284e8f6ae)
[YT JSM Google Login](https://www.youtube.com/watch?v=LKlO8vLvUao)
[Supabase CLI](https://supabase.com/docs/guides/cli)
