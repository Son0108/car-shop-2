import useSWR from "swr";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthenticationContext/AuthenticationContext";
import WelcomeUserPanel from "../../molecules/WelcomeUserPanel/WelcomeUserPanel";
import RealEstatesPanel from "../../molecules/RealEstatesPanel/RealEstatesPanel";
import { RealEstate } from "../../../definitions/types/models/RealEstate";
import ActivitiesPanel from "../../molecules/ActivitiesPanel/ActivitiesPanel";
import { Activity } from "../../../definitions/types/models/Activity";
import { PaginationProps } from "../../molecules/PaginationPanel/PaginationPanel";
import { Count } from "../../../definitions/types/models/Count";

const AgentDashboard = () => {
  const { avatar, user } = useAuth();

  const [paginationRealEstates, setPaginationRealEstates] =
    useState<PaginationProps>({
      page: 0,
      size: 5,
    });
  const { data: realEstates, error: realEstatesError } = useSWR<RealEstate[]>(
    `/real-estates/own?page=${paginationRealEstates.page}&size=${paginationRealEstates.size}`
  );
  const { data: activities, error: activitiesError } = useSWR<Activity[]>(
    "/users/own/activities"
  );

  const { data: count } = useSWR<Count>(`/real-estates/own/count`);

  useEffect(() => {
    setPaginationRealEstates((prevState) => {
      return {
        ...prevState,
        totalCount: count?.count,
      };
    });
  }, [count]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {user && (
        <div className="lg:col-span-3 self-stretch">
          <WelcomeUserPanel user={user} src={avatar} />
        </div>
      )}
      <div className="lg:col-span-2 md:row-span-2 self-stretch">
        <ActivitiesPanel
          activities={activities}
          loading={!activities && !activitiesError}
        />
      </div>
      <div className="lg:col-span-3 self-stretch lg:min-h-screen-30">
        <RealEstatesPanel
          pagination={{
            page: paginationRealEstates.page,
            size: paginationRealEstates.size,
            totalCount: count?.count,
            setPagination: setPaginationRealEstates,
            showAll: {
              show: true,
              url: "/real-estates",
            },
          }}
          loading={!realEstates && !realEstatesError}
          realEstates={realEstates}
        />
      </div>
    </div>
  );
};

export default AgentDashboard;
