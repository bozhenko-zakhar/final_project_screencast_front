import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";
import css from "./page.module.css"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function DiaryDetailsDefault({ params }: Props) {
	const { id } = await params

  if (!id) {
    return (
			<div className={css.container}>
				<div className={css.empty_text}>
					Оберіть будь-яку нотатку для детального перегляду
				</div>
      </div>
    );
  }

  return <DiaryEntryDetails entryId={id} />;
}