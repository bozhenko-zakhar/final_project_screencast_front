"use client";

import GreetingBlock from "./GreetingBlock/GreetingBlock";
import TasksReminderCard from "./TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "./FeelingCheckCard/FeelingCheckCard";
<<<<<<< HEAD
=======
import styles from "../DashboardPage_main/DashboardPage_main.module.css";

>>>>>>> origin/main
import StatusBlock from "./StatusBlock/StatusBlock";
import BabyTodayCard from "./BabyTodayCard/BabyTodayCard";
import MomTipCard from "./MomTipCard/MomTipCard";

<<<<<<< HEAD
import styles from "./DashboardPage_main.module.css";
=======
>>>>>>> origin/main

const DashboardPage = () => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.greetingWrapper}>
        <GreetingBlock />
      </div>
<<<<<<< HEAD

=======
>>>>>>> origin/main
      <div className={styles.leftColumn}>
        <StatusBlock />
        <BabyTodayCard />
        <MomTipCard />
      </div>
<<<<<<< HEAD

=======
>>>>>>> origin/main
      <div className={styles.rightColumn}>
        <TasksReminderCard />
        <FeelingCheckCard />
      </div>
    </section>
  );
};

export default DashboardPage;