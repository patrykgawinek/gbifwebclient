import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  id: string;
}

const SingleOccurencePage = () => {
  let { id } = useParams<ParamTypes>();

  return <div>{id}</div>;
};

export default SingleOccurencePage;
