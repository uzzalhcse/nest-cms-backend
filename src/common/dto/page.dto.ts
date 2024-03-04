import { PageMeta } from './page-meta.dto';

export class Page<T> {
  data: T[];
  meta: PageMeta;
}
