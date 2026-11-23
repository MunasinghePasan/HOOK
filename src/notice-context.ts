import { createContext } from "react";
import type { Destination } from "./config";

export const NoticeContext = createContext<(kind: Destination) => void>(
  () => {},
);
