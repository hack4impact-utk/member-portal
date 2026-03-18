import {ReactNode} from 'react'
import FilterMenu from "@/components/filer-and-search/filter";
import Search from '@/components/filer-and-search/search';

export default function members(): ReactNode {
    return(
        <div>
            {/* Temporary Placement of Search and Filter Components */}
            <Search />
            <FilterMenu />
        </div>
    );
}