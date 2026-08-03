import data from "./data.json";
import { SectionCards } from "@/components/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { DataTable } from "@/components/dashboard/data-table";

export default function Page() {
  return (
    <div className='flex flex-col flex-1'>
      <div className='@container/main flex flex-col flex-1 gap-2'>
        <div className='flex flex-col gap-4 md:gap-6 py-4 md:py-6'>
          <SectionCards />
          <div className='px-4 lg:px-6'>
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
