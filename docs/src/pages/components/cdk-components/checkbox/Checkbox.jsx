import React from "react";
import { DxcTabsForSections } from "@dxc-technology/halstack-react";

import ComponentDoc from "../../common/ComponentDoc";
import DocTitle from "../../../../common/DocTitle";
import Section from "../../common/Section";
import Example from "../../common/Example";
import ComponentHeader from "../../common/ComponentHeader";
import CheckboxPropsTable from "./api.jsx";
import CheckboxTokensTable from "./Tokens.jsx"

import controlled from "./examples/controlledCheckbox";
import uncontrolled from "./examples/uncontrolledCheckbox";
import labelPosition from "./examples/labelPosition";
import sized from "./examples/sizedCheckbox";

function Checkbox() {
  return (
    <ComponentDoc>
      <ComponentHeader
        title="Checkbox"
        status="ready"
      ></ComponentHeader>
      <DxcTabsForSections
        stickAtPx={64}
        tabsMode="underlined"
        sections={[
          {
            tabLabel: "Props",
            section: () => (
              <Section>
                <DocTitle size={2}>Props</DocTitle>
                <CheckboxPropsTable />
              </Section>
            )
          },
          {
            tabLabel: "Theming",
            section: () => (
              <Section>
                <DocTitle size={2}>Theming</DocTitle>
                <CheckboxTokensTable />
              </Section>
            )
          },
          {
            tabLabel: "Examples",
            section: () => (
              <Section>
                <DocTitle size={2}>Examples</DocTitle>
                <Example
                  title="Controlled Checkbox"
                  example={controlled}
                ></Example>
                <Example
                  title="Uncontrolled Checkbox"
                  example={uncontrolled}
                ></Example>
                <Example
                  title="Label position Checkbox"
                  example={labelPosition}
                ></Example>
                <Example
                  title="Sized Checkbox"
                  example={sized}
                ></Example>
              </Section>
            )
          }
        ]}
      ></DxcTabsForSections>
    </ComponentDoc>
  );
}

export default Checkbox;
