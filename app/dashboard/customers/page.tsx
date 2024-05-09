import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchCustomersPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { TableRowSkeleton } from '@/app/ui/skeletons';
import CustomersTable from '@/app/ui/customers/table';
import Pagination from '@/app/ui/customers/pagination';

export const metadata: Metadata = {
  title: 'Customers',
};

const page = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);

  return (
    <>
        <CustomersTable query={query} currentPage={currentPage} />
      {/* <Suspense key={query + currentPage} fallback={<TableRowSkeleton />}>
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default page;
