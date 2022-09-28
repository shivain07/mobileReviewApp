import { Input, SearchIcon, View } from 'native-base';
import React from 'react';

interface ISearchBoxInputComponentProps {
    inputSize?: string,
    placeholderText?: string,
    inputStyleProps?: {},
    inputWrapperComponentStyleProps?: {},
    onChangeHandler?: () => void
}
function SearchBoxInputComponent({
    inputSize = "xl",
    placeholderText = "Search",
    inputStyleProps,
    inputWrapperComponentStyleProps,
    onChangeHandler
}: ISearchBoxInputComponentProps) {
    return (
        <View {...inputWrapperComponentStyleProps}>

            <Input onPressIn={onChangeHandler} size={inputSize} placeholder={placeholderText} {...inputStyleProps} InputRightElement={<SearchIcon mr={2} size={"lg"} />} />

        </View>
    );
}

export default SearchBoxInputComponent;