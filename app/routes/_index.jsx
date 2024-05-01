import { Accordion } from "@mantine/core";
import { IconFolder } from "@tabler/icons-react";
import { useState } from "react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const groceries = [
  {
    value: "Apples",
    description:
      "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
  },
  {
    value: "Bananas",
    description:
      "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
  },
  {
    value: "Broccoli",
    description:
      "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
  },
];

export default function Index() {
  const [value, setValue] = useState(["Apples"]);
  return (
    <>
      <main>
        <section className="py-12">
          <div className="xl:container">
            <div className="flex">
              <div className="w-2/3">
                <Accordion
                  variant="contained"
                  disableChevronRotation
                  value={value}
                  className="bg-white"
                  onChange={setValue}
                >
                  {groceries.map((item) => (
                    <Accordion.Item key={item.value} value={item.value}>
                      <Accordion.Control icon={<IconFolder />}>
                        {item.value}
                      </Accordion.Control>
                      <Accordion.Panel>{item.description}</Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
