import PrimarySearchAppBar from "../../components/Navbar"
export default function Player() {
    const createHandler = () => {
        return null
    }
    return (
        <>
            <PrimarySearchAppBar createHandler={createHandler} />
            <div>
                <video src=""></video>
            </div>
        </>
    )
}