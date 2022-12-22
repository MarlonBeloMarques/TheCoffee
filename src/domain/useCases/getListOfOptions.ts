import Option from '../models/Option';

export default interface GetListOfOptions {
  get(): Promise<Array<Option>>;
}
