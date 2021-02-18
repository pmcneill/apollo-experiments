import { useState } from 'react';

export default function useFormData<T extends Record<string, string>>(start_data: T) : [ result: T, update_value: (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void ] {
  let [ result, setResult ] = useState<T>(start_data);

  const update_value = function(evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setResult( ( obj : T ) => {
      // Promise typescript that we'll always be dealing with valid values.
      // Its concern is that T may narrow a key's possible values to only
      // certain strings (eg, "on" | "off"), so assigning a generic string
      // could violate that type.
      obj[<keyof T>evt.target.name] = <T[keyof T]>evt.target.value;

      return obj;
    });
  }

  return [ result, update_value ];
}
