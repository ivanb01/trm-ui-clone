// Import necessary types from Ant Design
import { ColumnType as AntColumnType } from 'antd/es/table';
import { ColumnGroupType } from 'antd/es/table/interface';

// Import the custom enum for table data types
import { TableDataTypes } from '../enums/TableDataTypes';

/**
 * Define a type to exclude NUMBER and TEXT from TableDataTypes
 */
type ExcludeNumberOrText = Exclude<
  TableDataTypes,
  TableDataTypes.NUMBER | TableDataTypes.TEXT
>;

/**
 * Interface for columns with unit (for NUMBER and TEXT types)
 */
export interface ColumnTypeWithUnit<T> extends AntColumnType<T> {
  disabled?: boolean;
  type: TableDataTypes.NUMBER | TableDataTypes.TEXT;
  unit?: string;
}

/**
 * Interface for columns without unit (for other types)
 */
export interface ColumnTypeWithOutUnit<T> extends AntColumnType<T> {
  disabled?: boolean;
  type?: ExcludeNumberOrText;
  unit?: never;
}

/**
 * Define a union type for columns with or without unit
 */
export type Column<T> = ColumnTypeWithOutUnit<T> | ColumnTypeWithUnit<T>;

/**
 * Define a type for table rows, combining column types with group types
 */
type TableRows<T> = Column<T> | ColumnGroupType<T>;

/**
 * Define a type for table rows without dataIndex
 */
type TableRowWithoutDataIndex<T> = Omit<TableRows<T>, 'dataIndex'>;

/**
 * Define a function to join nested keys into dot notation
 */
/*type Join<K, P> = K extends number | string
  ? P extends number | string
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;*/

/** Define a type for previous keys in nested objects **/
// type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Define a type for leaf keys in nested objects
 */
/*type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: T[K] extends Array<infer U>
          ? Join<K, `${number}`> | Join<K, Leaves<U, Prev[D]>>
          : Join<K, Leaves<T[K], Prev[D]>>;
      }[keyof T]
    : '';*/
/**
 * Interface for row modifier with dataIndex property
 * DataIndex represented in dot notation
 */
interface RowModifier<T> extends TableRowWithoutDataIndex<T> {
  dataIndex: keyof T;
}

/**
 * Define a type for column types
 */
export type ColumnType<T> = Column<T>;

/**
 * Define a type for table row properties
 */
export type TableRowProps<T> = (RowModifier<T> & ColumnType<T>)[];

/**
 * Define a type for columns type for a table
 */
export type ColumnsType<T> = Array<ColumnType<T>>;
