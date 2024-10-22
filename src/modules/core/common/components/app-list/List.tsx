import styles from "./List.module.scss";

interface ListProps<T> {
  options: T[];
  renderItem(option: T): React.ReactNode;
  title?: string;
}

const List = <T extends object>({
  renderItem,
  options,
  title,
}: ListProps<T>) => {
  return (
    <div className={styles.listContainer}>
      {title && <h1>{title}</h1>}
      <>{options.map(renderItem)}</>
    </div>
  );
};
export default List;
