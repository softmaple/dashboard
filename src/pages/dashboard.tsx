import { useState } from "react";
import type { GetServerSideProps } from "next";
import { Layout } from "@/components/layout";
import { Header } from "@/components/header";
import { SwitchUIButton } from "@/components/switch-ui-button";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { Clone, RepoType, View } from "@/types";
import dbConnect from "@/lib/db-connect";
import CloneModel from "@/models/clone";
import ViewModel from "@/models/view";

type Data = {
  clones: Clone[];
  views: View[];
};

type DashboardProps = {
  data: Data;
  error: null | {};
};

export default function Dashboard({ data, error }: DashboardProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  if (error) {
    return <div>Something wrong when retrieving data from db...</div>;
  }

  const { clones, views } = data;

  return (
    <Layout isDarkMode={isDarkMode}>
      <Header>
        <SwitchUIButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </Header>
      <DashboardTabs clones={clones} views={views} isDarkMode={isDarkMode} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let data: Partial<Data> = {},
    error = null;

  try {
    await dbConnect();

    const originClones = await CloneModel.find(
      { name: RepoType.EDITOR },
      // exclude createdAt, updatedAt and __v fields
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    ).sort({ timestamp: 1 });

    const originViews = await ViewModel.find(
      { name: RepoType.EDITOR },
      // exclude createdAt, updatedAt and __v fields
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    ).sort({ timestamp: 1 });

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

    data.clones = clones;
    data.views = views;
  } catch (err) {
    console.error(err);
    error = JSON.stringify(err);
  }

  return {
    props: {
      data,
      error,
    },
  };
};
