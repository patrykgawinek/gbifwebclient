interface SingleOccurencePage {
  id: number;
}

const SingleOccurencePage = ({ id }: SingleOccurencePage) => {
  return <div>{id}</div>;
};

export default SingleOccurencePage;
