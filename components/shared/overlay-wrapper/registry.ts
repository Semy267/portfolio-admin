import * as React from "react";
import OvConfirmation, { OvConfirmationProps } from "./ov-confirmation";
import OvProjectForm, { OvProjectFormProps } from "./ov-project-form";
import OvTechnologyForm, { OvTechnologyFormProps } from "./ov-technology-form";
import OvSkillForm, { OvSkillFormProps } from "./ov-skill-form";
import OvExperienceForm, { OvExperienceFormProps } from "./ov-experience-form";
import OvSocialLinkForm, { OvSocialLinkFormProps } from "./ov-social-link-form";
import OvMediaPicker, { OvMediaPickerProps } from "./ov-media-picker";

export interface OverlayComponentPropsMap {
  ov_confirmation: OvConfirmationProps;
  CONFRIMATION: OvConfirmationProps;
  ov_project_form: OvProjectFormProps;
  ov_technology_form: OvTechnologyFormProps;
  ov_skill_form: OvSkillFormProps;
  ov_experience_form: OvExperienceFormProps;
  ov_social_link_form: OvSocialLinkFormProps;
  ov_media_picker: OvMediaPickerProps;
}

export const OVERLAY_REGISTRY: Record<string, React.ComponentType<any>> = {
  ov_confirmation: OvConfirmation,
  CONFRIMATION: OvConfirmation,
  ov_project_form: OvProjectForm,
  ov_technology_form: OvTechnologyForm,
  ov_skill_form: OvSkillForm,
  ov_experience_form: OvExperienceForm,
  ov_social_link_form: OvSocialLinkForm,
  ov_media_picker: OvMediaPicker,
};

export type OverlayCode = keyof OverlayComponentPropsMap | (string & {});
