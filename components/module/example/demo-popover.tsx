import CPopover from "@/components/shared/custome/c-popover";

export default function DemoPopover() {
  return (
    <div className="*:flex *:items-center">
      <div>
        <p>With title and description</p>
        <CPopover
          description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
          title="lorem ipsum dolor"
        />
      </div>
      <div>
        <p>Only description</p>
        <CPopover description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." />
      </div>
    </div>
  );
}
