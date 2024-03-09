import { useLogout } from "./useLogOut";

const SomeUtilityFunction = async () => {
    const { handleLogout } = useLogout();

    // Now you can use handleLogout here
    await handleLogout();
};

export default SomeUtilityFunction;