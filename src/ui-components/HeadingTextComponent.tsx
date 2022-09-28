import { Box, Text } from 'native-base';
import React from 'react';

interface IHeadingTextComponentProps {
    text: string,
    textSize: number | string,
    textPosition?: string,
    textBg?: string,
    textWeight?: string,
    textStyleProps?: {},
    headingWrapperComponentStyle?: {}
}
const HeadingTextComponent = ({
    text,
    textSize,
    textPosition = "center",
    textBg = "",
    textWeight = "normal",
    textStyleProps,
    headingWrapperComponentStyle
}: IHeadingTextComponentProps) => {
    return (
        <Box bg={textBg} alignItems={textPosition} {...headingWrapperComponentStyle}>
            <Text fontSize={textSize} fontWeight={textWeight} {...textStyleProps}>
                {text}
            </Text>
        </Box>

    );
}

export default HeadingTextComponent;