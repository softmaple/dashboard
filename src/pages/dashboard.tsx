import { useState } from "react";
import styled from "@emotion/styled";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import type { GetStaticProps } from "next";
import { Layout } from "@/components/layout";
import { SwitchUIButton } from "@/components/switch-ui-button";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { Clone, RepoType, View } from "@/types";
import dbConnect from "@/lib/db-connect";
import CloneModel from "@/models/clone";
import ViewModel from "@/models/view";

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  align-content: center;
  gap: 1rem;
`;

type DashboardProps = {
  clones: Clone[];
  views: View[];
};

export default function Dashboard({ clones, views }: DashboardProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <Layout isDarkMode={isDarkMode}>
      <StyledHeader>
        <Link
          href="https://github.com/SoftMaple/github-insights-view"
          underline="none"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon fontSize="large" color="action" />
        </Link>
        <SwitchUIButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </StyledHeader>
      <DashboardTabs clones={clones} views={views} isDarkMode={isDarkMode} />
    </Layout>
  );
}

/**
 * This function gets called at build time on server-side.
 * It won't be called on client-side, so you can even do
 * direct database queries.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#technical-details
 */
export const getStaticProps: GetStaticProps = async () => {
  // TODO: optimize this, need error handler or try/catch
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

  // console.log("clones: ", clones);
  // console.log("views: ", views);

  return {
    props: {
      clones,
      views,
    },
  };
};
