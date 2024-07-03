import { TopLevelSpec } from "vega-lite";

type Props = {
  spec: TopLevelSpec;
  className?: string;
  data: any;
};

// const isSceneText = (
//   item: VegaScene | VegaSceneGroup | SceneText
// ): item is SceneText => "text" in item;

const KpiWrapper = ({ spec, data, ...restProps }: Props): JSX.Element => {
  // const [text, setText] = useState("#");

  // useEffect(() => {
  //   getMarks(spec).then((marks) => {
  //     if (!marks[0]) return;
  //     if (isSceneText(marks[0])) {
  //       setText(marks[0].text);
  //     }
  //   });
  // });

  return (
    <p color="#fff" {...restProps}>
      {data.last_run}
    </p>
  );
};

export default KpiWrapper;
