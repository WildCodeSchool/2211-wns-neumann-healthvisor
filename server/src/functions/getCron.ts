import { CronValues } from "../utilities/enum";

export default function getCron(value: number): CronValues | false {
  switch (value) {
    case 1:
      return CronValues.OneMinute;
    case 15:
      return CronValues.FifteenMinutes;
    case 30:
      return CronValues.ThirtyMinutes;
    case 60:
      return CronValues.SixtyMinutes;
    default:
      return false;
  }
}
