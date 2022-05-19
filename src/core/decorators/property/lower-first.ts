import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Converts the first character of the value of the string property to lower case.
 */
export function lowerFirst(): PropertyAnnotator<Nullish<string>> {
  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue: any = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isString(nextValue)) {
          throw new Error(`Value of '${key}' should be a string. ${target.constructor.name}.`);
        }

        if (Validator.isString(nextValue)) {
          currentValue = nextValue.charAt(0).toLowerCase() + nextValue.slice(1);
        } else {
          currentValue = nextValue;
        }
      },
      get: () => currentValue,
    });
  };
}
