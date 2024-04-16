import { ApplicationStatus } from "../../definitions/types/models/Application";
import { RealEstateStatus } from "../../definitions/types/models/RealEstate";

// Values granted to the application-status to enable sorting
const applicationStatusValueMapping: Record<ApplicationStatus, number> = {
  ACCEPTED: 1,
  TEMPORARY_ACCEPTED: 2,
  ON_HOLD: 3,
  OPEN: 4,
  DECLINED: 5,
};

/**
 * A compare-function to sort applications by their status.
 * @param status1
 * @param status2
 * @param ascending
 */
export function sortByApplicationStatus(
  status1: ApplicationStatus,
  status2: ApplicationStatus,
  ascending = true
): number {
  const value1 = applicationStatusValueMapping[status1];
  const value2 = applicationStatusValueMapping[status2];

  if (ascending) {
    return value1 - value2;
  }

  return value2 - value1;
}

export function sortByApplicationStarred(
  starred1: boolean,
  starred2: boolean,
  ascending = true
): number {
  if (ascending) {
    return Number(starred1) - Number(starred2);
  }

  return Number(starred2) - Number(starred1);
}

// Values granted to the application-status to enable sorting
const realEstateStatusValueMapping: Record<RealEstateStatus, number> = {
  ON_HOLD: 1,
  OPEN: 2,
  CLOSED: 3,
};

/**
 * A compare function to sort real-estates by their status.
 * @param status1
 * @param status2
 * @param ascending
 */
export function sortByRealEstateStatus(
  status1: RealEstateStatus,
  status2: RealEstateStatus,
  ascending = true
): number {
  const values1 = realEstateStatusValueMapping[status1];
  const values2 = realEstateStatusValueMapping[status2];

  if (ascending) {
    return values1 - values2;
  }

  return values2 - values1;
}
