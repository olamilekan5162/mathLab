import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({loading}) => {

    const override = {
        display: 'block',
        margin: '0 auto'
    }
  return (
    <>
        <ClipLoader
        color='white'
        loading={loading}
        cssOverride={override}
        size={20}

      />
    </>
  )
}

export default Spinner