import { ApplicationStatus } from "../../definitions/types/models/Application";
import { BadgeColor } from "../../components/atoms/Badge/Badge";
import { RealEstateStatus } from "../../definitions/types/models/RealEstate";

/**
 * Get badge-coloring depending on the application-status
 * @param status
 */
export function getBadgeColorForApplicationStatus(
  status: ApplicationStatus
): BadgeColor {
  switch (status) {
    case "ACCEPTED":
      return "success";
    case "TEMPORARY_ACCEPTED":
      return "success";
    case "ON_HOLD":
      return "warning";
    case "DECLINED":
      return "error";
    case "OPEN":
      return "info";
    default:
      return "gray";
  }
}

/**
 * Get badge-coloring depending on the real-estate status.
 * @param status
 */
export function getBadgeColorForRealEstateStatus(
  status: RealEstateStatus
): BadgeColor {
  switch (status) {
    case "CLOSED":
      return "primary";
    case "ON_HOLD":
      return "success";
    case "OPEN":
      return "info";
    default:
      return "gray";
  }
}
