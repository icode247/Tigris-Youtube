import PrimarySearchAppBar from "../../components/Navbar"
export default function Player() {
    return (

        <>
            <PrimarySearchAppBar createHandler={createHandler} />
            <div>
                <video src=""></video>
            </div>
        </>
    )
}