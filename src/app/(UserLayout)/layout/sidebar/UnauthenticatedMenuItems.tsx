import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconHome,
  IconCurrencyDollar,
  IconBuildingBank, // Alternative to IconBank
  IconTransfer,
  IconWallet, // 
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const UnauthenticatedMenuItems = [

  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/register",
  },

  {
    id: uniqueId(),
    title: "Save",
    icon: IconWallet,
    href: "/utilities/save",
  },
  {
    id: uniqueId(),
    title: "Spend",
    icon: IconCurrencyDollar,
    href: "/utilities/spend",
  },

];

export default UnauthenticatedMenuItems;
