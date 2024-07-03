import {
  SEND_NUMBERS_SECTION_1,
  SEND_NUMBERS_SECTION_2,
} from "@utils/constants";
import { Metrics1, Metrics2 } from "model/numbers.models";
import { SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "./swr.services";

export function useGetSendNumbers(config?: SWRConfiguration) {
  return useSWRImmutable<[Metrics1, Metrics2]>(
    [SEND_NUMBERS_SECTION_1, SEND_NUMBERS_SECTION_2],
    fetcher,
    config
  );
}
