import type { ActivityClient } from "../checkbox/checkbox-wrapper";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
} from "react";
import useOutsideClickRef from "@/src/hooks/useOutsideClickRef";
import Option, { optionStatus } from "./option";
import { QuestFormContext } from "@/src/contexts/questForm";
import type { ActivityStatus } from "@/src/types/shared.types";
import { S, props } from "./styles";

interface ActivityProps extends ActivityClient {
  id: string;
  activities: ActivityClient[];
  setActivities: Dispatch<SetStateAction<ActivityClient[]>>;
  deletable?: boolean;
  editMode?: boolean;
  popUpOrientation?: "vertical" | "horizontal";
}

export default function Activity({
  id,
  activityName,
  activityStatus,
  activities,
  setActivities,
  deletable = false,
  editMode = false,
  popUpOrientation = "vertical",
}: ActivityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useOutsideClickRef({ setIsOpen });
  const [currentActivity, setCurrentActivity] = useState<
    Omit<ActivityClient, "activityStatus"> & {
      activityStatus: keyof typeof ActivityStatus | "";
    }
  >({
    activityName,
    activityStatus: editMode ? activityStatus : "",
  });
  const isUnselected = currentActivity.activityStatus === "";
  const { dispatch } = useContext(QuestFormContext);

  useEffect(() => {
    setActivities(
      activities.map((activity) => {
        if (
          activity.activityName === currentActivity.activityName &&
          currentActivity.activityStatus !== ""
        ) {
          activity.activityStatus = currentActivity.activityStatus;
        }
        return activity;
      })
    );
    dispatch({
      fieldName: "activities",
      payload: activities,
      type: "field",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentActivity]);

  return (
    <motion.div
      key={id || activityName}
      className="flex w-full items-center justify-between transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <S.IconContainer onClick={() => setIsOpen(!isOpen)}>
        <Icon
          icon={
            isUnselected
              ? "ph:arrow-square-down"
              : optionStatus[
                  currentActivity.activityStatus as typeof activityStatus
                ].icon
          }
          className={props.Icon({
            isUnselected,
            isUnselectedAndOpen: isUnselected && isOpen,
            activityStatus:
              !isUnselected && currentActivity.activityStatus
                ? currentActivity.activityStatus
                : false,
          })}
        />
        <input
          required
          id={id}
          name={id}
          hidden
          defaultValue={activityStatus}
          readOnly
        />
        <S.OptionContainer
          ref={selectRef}
          className={props.OptionContainer({
            isOpen,
            vertical: popUpOrientation === "vertical",
          })}
        >
          <Option
            popUpOrientation={popUpOrientation}
            onClick={() => {
              setCurrentActivity({
                ...currentActivity,
                activityStatus: "not_started",
              });
              dispatch({
                fieldName: "activities",
                payload: activities,
                type: "field",
              });
              setIsOpen(false);
            }}
            value="not_started"
          />
          <Option
            popUpOrientation={popUpOrientation}
            onClick={() => {
              setCurrentActivity({
                ...currentActivity,
                activityStatus: "in_progress",
              });
              dispatch({
                fieldName: "activities",
                payload: activities,
                type: "field",
              });
              setIsOpen(false);
            }}
            value="in_progress"
          />
          <Option
            popUpOrientation={popUpOrientation}
            onClick={() => {
              setCurrentActivity({
                ...currentActivity,
                activityStatus: "success",
              });
              dispatch({
                fieldName: "activities",
                payload: activities,
                type: "field",
              });
              setIsOpen(false);
            }}
            value="success"
          />
          <Option
            popUpOrientation={popUpOrientation}
            onClick={() => {
              setCurrentActivity({
                ...currentActivity,
                activityStatus: "failure",
              });
              dispatch({
                fieldName: "activities",
                payload: activities,
                type: "field",
              });
              setIsOpen(false);
            }}
            value="failure"
          />
        </S.OptionContainer>
        <label htmlFor={id} className="cursor-pointer text-sm text-gray-600">
          <span>{activityName}</span>
        </label>
      </S.IconContainer>
      {deletable && (
        <Icon
          icon="ph:trash"
          onClick={() => {
            setActivities([
              ...activities
                .filter((activity) => activity.activityName !== activityName)
                .map((activity) => activity),
            ]);
          }}
          className="cursor-pointer text-burgundy-400"
        />
      )}
    </motion.div>
  );
}
