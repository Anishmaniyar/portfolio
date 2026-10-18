import type { Project } from "../../data/projects";
import AscendIcon from "./AscendIcon";
import CruorIcon from "./CruorIcon";
import ZoltIcon from "./ZoltIcon";

/*
 * Maps a project id to its icon. Kept as one entry point so the Work
 * section (and anywhere else) can render the right mark without knowing
 * the individual components.
 */
export function ProjectIcon({ id }: { id: Project["id"] }) {
  if (id === "zolt") return <ZoltIcon />;
  if (id === "ascend") return <AscendIcon />;
  return <CruorIcon />;
}
