import { useMemo, useState } from "react";
import { Lecture, SearchOption } from "../../../types";
import { filterByCredits, filterByDays, filterByGrades, filterByMajors, filterByQuery, filterByTimes } from "../../../lib/utils/searchDialogUtils";
import { lazyFilter } from "../../../lib/utils/lazyFilter";

export const useSearch = (lectures: Lecture[]) => {
  const [searchOptions, setSearchOptions] = useState<SearchOption>({
    query: "",
    grades: [],
    days: [],
    times: [],
    majors: [],
  });

  const filters = useMemo(() => [
    filterByQuery(searchOptions.query || ""),
    filterByGrades(searchOptions.grades),
    filterByMajors(searchOptions.majors),
    filterByCredits(searchOptions?.credits || 0),
    filterByDays(searchOptions.days),
    filterByTimes(searchOptions.times),
  ], [searchOptions]);

  const filteredLectures = useMemo(() => {
    return [...lazyFilter(lectures, filters)]
  }, [lectures, filters]);

  return {
    searchOptions,
    setSearchOptions,
    filteredLectures,
  }
}