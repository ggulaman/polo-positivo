export const validateIntBetween0and100 = value => !isNaN(value) && value >= 0 && value <= 100;

export const validateDegrees = value => !isNaN(value) && value >= -90 && value <= 90;

export const validateDegreesBtw0and90 = value => !isNaN(value) && value >= 0 && value <= 90;

export const validatePositiveNumber = value => !isNaN(value) && value > 0;