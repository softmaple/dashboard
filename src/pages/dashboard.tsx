import dbConnect from "@/lib/db-connect";
import Clone from "@/models/clone";
import View from "@/models/view";
import { HeatmapCalendar } from "@/components/heatmap-calendar";
import { GetStaticProps } from "next";

type DashboardProps = {
  clones: any;
  views: any;
};

export default function Dashboard({ clones, views }: DashboardProps) {
  return <HeatmapCalendar />;
}

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();

  const originClones = await Clone.find(
    {},
    // exclude createdAt, updatedAt and __v fields
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  const originViews = await View.find(
    {},
    // exclude createdAt, updatedAt and __v fields
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  const clones = originClones.map((doc) => {
    const clone = doc.toObject();
    clone._id = clone._id.toString();
    return clone;
  });

  const views = originViews.map((doc) => {
    const view = doc.toObject();
    view._id = view._id.toString();
    return view;
  });

  // console.log("clones: ", clones);
  // console.log("views: ", views);

  return {
    props: {
      clones,
      views,
    },
  };
};
