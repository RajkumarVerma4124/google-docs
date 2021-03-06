import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";


function DocumentRow({ id, fileName, date, onDelete }) {
    const router = useRouter();

  return (
    // <Link href={`/doc/${id}`}>
    //   <a>
    <div
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 hover:shadow-2xl cursor-pointer"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="border-0"
        onClick={(event) => {event.preventDefault();
        onDelete(id);
        }}
      >
        <Icon name="delete" size="3xl" color="red" />
      </Button>

      {/* <Button
        color="gray"
        buttonType="link"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="w-20 border-0"
      >
        <Icon name="more_vert" size="3xl" />
      </Button> */}
    </div>
    //   </a>
    // </Link>
  );
}

export default DocumentRow;
