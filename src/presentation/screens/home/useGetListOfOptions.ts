import { useEffect, useState } from 'react';
import { GetListOfOptions } from '~/domain/useCases';
import { OptionOfList } from './model';

const useGetListOfOptionsContext = (
  getListOfOptions: GetListOfOptions,
): {
  listOfOptions: Array<OptionOfList>;
} => {
  const [listOfOptions, setListOfOptions] = useState<Array<OptionOfList>>([]);

  useEffect(() => {
    requestStart();
  }, []);

  const requestStart = async () => {
    const response = await requestListOfOptions();
    setListOfOptions(response);
  };

  const requestListOfOptions = async () => {
    return await getListOfOptions.get();
  };

  return { listOfOptions };
};

export default useGetListOfOptionsContext;
