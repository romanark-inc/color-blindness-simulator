'use client'

import { useState } from 'react';
import { simulateColorVision, ColorVisionType } from '../utils/colorVisionSimulation';
import { generateColorVariations } from '../utils/colorUtils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const colorVisionTypes: ColorVisionType[] = ['normal', 'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'];

export default function ColorPalette() {
  const [colors, setColors] = useState<string[]>(['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']);
  const [currentColor, setCurrentColor] = useState('#000000');

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleAddColor = () => {
    if (colors.length < 5) {
      setColors([...colors, currentColor]);
      setCurrentColor('#000000');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Webデザインカラーパレット</h1>
      <div className="mb-4 flex items-end space-x-2">
        <div>
          <Label htmlFor="colorPicker">新しい色を追加：</Label>
          <Input
            type="color"
            id="colorPicker"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="w-full h-12 mt-2"
          />
        </div>
        <Button onClick={handleAddColor} disabled={colors.length >= 5}>
          色を追加
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {colors.map((color, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>色 {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="w-full h-12 mb-2"
              />
              <p>{color}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">色覚タイプ別表示</h2>
      {colorVisionTypes.map((type) => (
        <div key={type} className="mb-8">
          <h3 className="text-lg font-semibold mb-2">{getColorVisionTypeName(type)}</h3>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color, index) => {
              const simulatedColor = simulateColorVision(color, type);
              return (
                <div key={index} className="text-center">
                  <div
                    className="w-full h-12 mb-1 rounded"
                    style={{ backgroundColor: simulatedColor }}
                  ></div>
                  <p className="text-xs">{simulatedColor}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <h2 className="text-xl font-bold mb-4">色のバリエーション</h2>
      {colors.map((color, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-lg font-semibold mb-2">色 {index + 1} のバリエーション</h3>
          <div className="grid grid-cols-9 gap-2">
            {generateColorVariations(color).map((variation, vIndex) => (
              <div key={vIndex} className="text-center">
                <div
                  className="w-full h-12 mb-1 rounded"
                  style={{ backgroundColor: variation }}
                ></div>
                <p className="text-xs">{variation}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function getColorVisionTypeName(type: ColorVisionType): string {
  switch (type) {
    case 'normal':
      return '通常視覚';
    case 'protanopia':
      return '1型色覚（プロタノピア）';
    case 'deuteranopia':
      return '2型色覚（デウテラノピア）';
    case 'tritanopia':
      return '3型色覚（トリタノピア）';
    case 'achromatopsia':
      return '完全色覚異常（アクロマトプシア）';
  }
}

