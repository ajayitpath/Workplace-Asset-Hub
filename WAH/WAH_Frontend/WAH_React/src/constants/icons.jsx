import {
  FaTools, FaBoxes, FaClipboardCheck, FaBell, FaChartLine, FaFileAlt,
  FaQuestionCircle, FaUsersCog, FaCog, FaPlus, FaEye, FaTrash, FaPencilAlt, FaSignOutAlt
} from 'react-icons/fa';
import { HiViewGrid } from 'react-icons/hi';

export const icons = {
    dashboard : HiViewGrid,
    inventory : FaBoxes,
    reqApproval : FaClipboardCheck,
    assetManage : FaTools,
    notification : FaBell,
    reports : FaChartLine,
    auditLog : FaFileAlt,
    supportFAQ : FaQuestionCircle,
    userManage : FaUsersCog,
    setting : FaCog,
    add : FaPlus,
    eye : FaEye,
    trash : FaTrash, 
    pencil : FaPencilAlt,
    logout : FaSignOutAlt
}
export function Icon({ name, ...props }) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent  {...props} />;
}