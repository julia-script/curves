import { CodeBlock, LiveCodeBlock } from "@/components/CodeBlock";

import { Tabs } from "@/components/Tabs";
export default function Page() {
  return (
    <>
      <LiveCodeBlock collapsed>{`
        import { Graph, Grid, Plot } from '@coord/graph'

        export default function MyGraph() {
          return (
            <Graph height={300} width="100%">
              <Grid />
              <Plot.ofXf=(x) => Math.sin(x)} />
            </Graph>
          );
        }
      `}</LiveCodeBlock>

      <h1>Getting started</h1>
      <p>
        Graph is a React component library for building data visualizations on
        the web.
      </p>
      <h2>Installation</h2>

      <p>
        Graph is available as an npm package. To install it, run the following
        command:
      </p>
      <Tabs
        preferenceKey="installation"
        tabs={{
          npm: (
            <CodeBlock key={"npm"} language="bash">
              npm install @coord/graph
            </CodeBlock>
          ),
          pnpm: (
            <CodeBlock key={"pnpm"} language="bash">
              pnpm install @coord/graph
            </CodeBlock>
          ),
          yarn: (
            <CodeBlock key={"yarn"} language="bash">
              yarn add @coord/graph
            </CodeBlock>
          ),
        }}
      />

      {/* <pre>
        <code>npm install @coord/graph</code>
      </pre> */}
    </>
  );
}
