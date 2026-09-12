"use client";
import { MdOutlineAttachEmail } from "react-icons/md";
import CButton from "@/components/shared/custome/c-button";
import { OPT_DUMMY } from "@/lib/constants";
import { UserSchema } from "@/lib/validation";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import CTextarea from "@/components/shared/form/textarea/c-textarea";
import CTextareaForm from "@/components/shared/form/textarea/c-textarea-form";
import CDatePicker from "@/components/shared/form/date-picker";
import { addDays } from "date-fns";
import CSelectForm from "@/components/shared/form/select/select-form";
import CSelect from "@/components/shared/form/select";
import CInput from "@/components/shared/form/input";
import CInputForm from "@/components/shared/form/input/input-form";
import CSelectMulti from "@/components/shared/form/select/select-multi";
import CRadioForm from "@/components/shared/form/radio/radion-form";
import CCheckboxForm from "@/components/shared/form/checkbox/checkbox-form";
import { CRadio } from "@/components/shared/form/radio";
import { CCheckbox } from "@/components/shared/form/checkbox";
import { CSwitch } from "@/components/shared/custome/c-switcher";

export default function DemoInput() {
  const [payload, setPayload] = useState({
    search: "",
    type: "",
    category: [] as string[],
    age: new Date(),
    booking: undefined,
    date: {
      from: new Date(),
      to: addDays(new Date(), 5),
    },
    enabled: false,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      hobby: "",
      agree: "",
      multi: "",
    },
    validators: {
      onChange: UserSchema,
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  const handleChangeAsync = async ({ value }: { value: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
      value.includes("errors") && {
        message: 'No "errors" allowed in username',
      }
    );
  };

  return (
    <div className="size-full max-w-2xl mx-auto flex items-start justify-center gap-[8px]">
      <form
        className="size-full grid gap-[12px]"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CInputForm name="name" placeholder="Jhon Doe" form={form} />
        <CTextareaForm name="name" placeholder="Jhon Doe" form={form} />
        <CInputForm
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: handleChangeAsync,
          }}
          name="username"
          placeholder="jhon_doe"
          form={form}
        />
        <CInputForm
          iconSvg={MdOutlineAttachEmail}
          name="email"
          placeholder="example@gmail.com"
          form={form}
        />
        <CInputForm name="password" placeholder="password" form={form} />
        <CSelectForm
          name="hobby"
          options={OPT_DUMMY}
          placeholder="Hobby"
          form={form}
        />
        <CSelectForm
          name="hobby"
          placeholder="Hobby"
          options={OPT_DUMMY}
          form={form}
        />
        <CRadioForm name="agree" form={form} opt={OPT_DUMMY?.slice(0, 4)} />
        <CCheckboxForm
          name="multi"
          label="select preference"
          form={form}
          opt={OPT_DUMMY}
        />
        <CButton title="Submit" type="submit" />
      </form>

      <div className="w-full grid grid-cols-1 gap-[8px]">
        <CInput
          placeholder="ajsja"
          value={payload.search}
          onChange={(e) => setPayload({ ...payload, search: e.target.value })}
        />
        <CSelect
          options={OPT_DUMMY}
          placeholder="select type"
          value={payload.type}
          onChange={(e) => setPayload({ ...payload, type: e })}
        />
        <CSelectMulti
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e })}
          options={OPT_DUMMY}
        />
        <CDatePicker
          mode="range"
          value={payload.date}
          onChange={(val: any) => setPayload({ ...payload, date: val })}
          maxDate={addDays(new Date(), 31)}
        />
        <CDatePicker
          value={payload.age}
          onChange={(e: any) => setPayload({ ...payload, age: e })}
          isHeader
        />
        <CDatePicker
          value={payload.booking}
          onChange={(e: any) => setPayload({ ...payload, booking: e })}
        />
        <CTextarea
          placeholder="ajsja"
          value={payload.search}
          onChange={(e) => setPayload({ ...payload, search: e.target.value })}
        />
        <CRadio label="radio" />
        <CCheckbox label="checbox" />
        <CSwitch
          checked={payload.enabled}
          onChange={(e) => setPayload({ ...payload, enabled: e })}
        />
      </div>
    </div>
  );
}
