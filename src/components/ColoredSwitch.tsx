import { withStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";

const ColoredSwitch = withStyles({
  switchBase: {
    color: "#f50057",
    "&$checked": {
      color: "#3f51b5",
    },
    "&$checked + $track": {
      backgroundColor: "#7986cb",
    },
  },
  checked: {},
  track: {},
})(Switch);
export default ColoredSwitch;
