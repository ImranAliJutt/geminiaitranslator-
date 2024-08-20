import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Box } from '@mui/material';

const Translation = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('hi');

    const handleTranslate = async () => {
        try {
            const response = await axios.post(
                `https://translation.googleapis.com/language/translate/v2`,
                {},
                {
                    params: {
                        q: inputText,
                        source: fromLanguage,
                        target: toLanguage,
                        key:process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY,
                    },
                }
            );
            setTranslatedText(response.data.data.translations[0].translatedText);
        } catch (error) {
            console.error('Error translating text:', error.response.data.error.message);
        }
    };

    return (
        <Box sx={{p:3, border: '1pxsolid #ddd', borderRadius:2, width: '400px', margin: '0auto', backgroundColor:'#fff',  position: 'absolute', 
            top: '50%', left: '50%',  transform: 'translate(-50%, -50%)'}}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Translation
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>From</InputLabel>
                <Select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)} label="From">
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="hi">Hindi</MenuItem>
                    <MenuItem value="ur">Urdu</MenuItem>
                    {/* Add more languages as needed */}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>To</InputLabel>
                <Select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)} label="To">
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="hi">Hindi</MenuItem>
                    <MenuItem value="ur">Urdu</MenuItem>
                    {/* Add more languages as needed */}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Text"
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                multiline
                rows={4}
                sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" onClick={handleTranslate}>
                Translate
            </Button>

            {translatedText && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                    <Typography variant="body1" gutterBottom>
                        {translatedText}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Translation;
