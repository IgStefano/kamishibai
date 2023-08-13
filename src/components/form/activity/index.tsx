import { classnames } from "@utils/classnames";
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

interface ActivityProps extends ActivityClient {
  id: string;
  activities: ActivityClient[];
  setActivities: Dispatch<SetStateAction<ActivityClient[]>>;
  deletable?: boolean;
  editMode?: boolean;
}

export default function Activity({
  id,
  activityName,
  activityStatus,
  activities,
  setActivities,
  deletable = false,
  editMode = false,
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
    console.log(activities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentActivity]);

  return (
    <motion.li
      key={id || activityName}
      className="flex w-full items-center justify-between transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={classnames(
          "relative flex w-fit cursor-pointer items-center gap-1"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          icon={
            isUnselected
              ? "ph:arrow-square-down"
              : optionStatus[
                  currentActivity.activityStatus as typeof activityStatus
                ].icon
          }
          className={classnames(
            "text-3xl text-gray-900 transition-all duration-300",
            isOpen && isUnselected ? "-rotate-90" : "",
            !isUnselected
              ? optionStatus[
                  currentActivity.activityStatus as typeof activityStatus
                ].color + " text-xl"
              : ""
          )}
        />
        <input
          required
          id={id}
          name={id}
          hidden
          defaultValue={activityStatus}
          readOnly
        />
        <div
          ref={selectRef}
          className={classnames(
            "form-select absolute z-10 flex translate-y-24 appearance-none flex-col border-0 bg-none px-2 transition-all duration-500",
            isOpen
              ? "opacity-100"
              : "pointer-events-none -translate-x-12 opacity-0"
          )}
        >
          <Option
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
        </div>
        <label
          htmlFor={id}
          className={classnames("cursor-pointer text-sm text-gray-600")}
        >
          <span>{activityName}</span>
        </label>
      </div>
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
    </motion.li>
  );
}
