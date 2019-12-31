#include "Layer.h"
#include "stringFunc.h"

CLayer::CLayer(Dwg_Object* pObject) :
	CObjectBase(pObject)
{
	Dwg_Object_LAYER* layer = pObject->tio.object->tio.LAYER;
	m_name = Utils::GetCadChar(layer->name);


	Utils::GetRealRGB(layer->color.rgb,m_color);
}

CLayer::~CLayer()
{
	
}