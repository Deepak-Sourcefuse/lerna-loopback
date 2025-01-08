import {MetadataInspector} from '@loopback/metadata';

export const FORMATTED_DATE_KEY = 'format:date';

export function FormattedDate() {
  return function (target: object, propertyKey: string) {
    MetadataInspector.defineMetadata(
      FORMATTED_DATE_KEY,
      true,
      target,
      propertyKey,
    );
  };
}

export function formatDates(model: any) {
  const formattedModel = {...model};
  for (const key of Object.keys(formattedModel)) {
    const isFormattedDate = MetadataInspector.getPropertyMetadata(
      FORMATTED_DATE_KEY,
      model,
      key,
    );
    if (isFormattedDate && formattedModel[key]) {
      formattedModel[key] = new Date(formattedModel[key]).toISOString();
    }
  }
  return formattedModel;
}
