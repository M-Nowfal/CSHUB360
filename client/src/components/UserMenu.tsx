import ASSETS from "../assets/assets";
import { useLogout } from "../hooks/useLogout";
import { useAppSelector } from "../redux/hooks";
import { getFirstTwoLettersOfName } from "../utils/helpers";
import Profile from "./Profile";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const UserMenu = () => {

  const user = useAppSelector(state => {
    if (state.role === "student")
      return state.student;
    return state.instructor;
  });

  const userName = user?.firstName + " " + user?.lastName;
  const { logout } = useLogout();

  return (
    <Dialog>
      <DialogTrigger>
        <Profile avatar={user?.avatar || ASSETS.userAvatr} fallBack={getFirstTwoLettersOfName(userName)} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-center my-3">
            <Profile size="xl" avatar={user?.avatar || ASSETS.userAvatr} fallBack={getFirstTwoLettersOfName(userName)} />
          </div>
          <DialogTitle className="text-2xl text-center">
            {user?.firstName} {user?.lastName}
          </DialogTitle>
          <DialogDescription className="text-center">
            {user?.email}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2 mt-6 sm:flex-col">
          <Button variant="destructive" type="submit" className="w-full" onClick={logout}>
            Log-Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UserMenu;
