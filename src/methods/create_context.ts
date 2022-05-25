
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import resolve from '~/methods/resolve';
import {context} from '~/oby';
import type {Child, Context} from '~/types';

/* MAIN */

const createContext = <T> ( defaultValue?: T ): Context<T> => {

  const symbol = Symbol ();

  const Provider = ({ value, children }: { value: T, children: Child }): Child => {

    return useComputed ( () => {

      context ( symbol, value );

      return resolve ( children );

    });

  };

  const Consumer = ({ children }: { children: (( value?: T ) => Child) }): Child => {

    const value = context<T> ( symbol ) ?? defaultValue;

    return children ( value );

  };

  return {Provider, Consumer};

};

/* EXPORT */

export default createContext;
